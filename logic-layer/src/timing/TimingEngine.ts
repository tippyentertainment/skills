import { TimingRule, TimingMode, RecurringConfig, BlackoutWindow } from '../types';

export class TimingEngine {
  private timingRules: Map<string, TimingRule> = new Map();
  private scheduledJobs: Map<string, NodeJS.Timeout> = new Map();

  async createTimingRule(config: {
    mode: TimingMode;
    delay?: number;
    scheduledTime?: Date;
    recurring?: RecurringConfig;
    timezone?: string;
    blackoutWindows?: BlackoutWindow[];
  }): Promise<TimingRule> {
    const id = this.generateId();
    
    const rule: TimingRule = {
      id,
      mode: config.mode,
      delay: config.delay,
      scheduledTime: config.scheduledTime,
      recurring: config.recurring,
      timezone: config.timezone || 'UTC',
      blackoutWindows: config.blackoutWindows || [],
    };

    this.timingRules.set(id, rule);
    return rule;
  }

  async getNextExecutionTime(ruleId: string): Promise<Date | null> {
    const rule = this.timingRules.get(ruleId);
    if (!rule) return null;

    const now = new Date();

    switch (rule.mode) {
      case 'immediate':
        return now;

      case 'delayed':
        if (rule.delay) {
          return new Date(now.getTime() + rule.delay);
        }
        return now;

      case 'scheduled':
        if (rule.scheduledTime) {
          return rule.scheduledTime;
        }
        return now;

      case 'recurring':
        if (rule.recurring) {
          return this.calculateNextRecurringTime(rule.recurring, now);
        }
        return now;

      default:
        return now;
    }
  }

  async isInBlackoutWindow(ruleId: string, time: Date): Promise<boolean> {
    const rule = this.timingRules.get(ruleId);
    if (!rule || !rule.blackoutWindows || rule.blackoutWindows.length === 0) {
      return false;
    }

    const timeStr = time.toTimeString().slice(0, 5); // HH:mm
    const dayOfWeek = time.toLocaleDateString('en-US', { weekday: 'lowercase' }) as string;

    for (const window of rule.blackoutWindows) {
      // Check if time is within blackout window
      if (timeStr >= window.startTime && timeStr <= window.endTime) {
        // Check if day matches (if specified)
        if (!window.days || window.days.length === 0 || window.days.includes(dayOfWeek as any)) {
          return true;
        }
      }
    }

    return false;
  }

  async scheduleExecution(
    ruleId: string,
    callback: () => Promise<void>
  ): Promise<string | null> {
    const rule = this.timingRules.get(ruleId);
    if (!rule) return null;

    const nextTime = await this.getNextExecutionTime(ruleId);
    if (!nextTime) return null;

    const delay = Math.max(0, nextTime.getTime() - Date.now());

    const jobId = this.generateJobId();
    const timeoutId = setTimeout(async () => {
      await callback();
      
      // For recurring rules, schedule next execution
      if (rule.mode === 'recurring' && rule.recurring) {
        await this.scheduleExecution(ruleId, callback);
      }
    }, delay);

    this.scheduledJobs.set(jobId, timeoutId);
    return jobId;
  }

  async cancelScheduledExecution(jobId: string): Promise<boolean> {
    const timeoutId = this.scheduledJobs.get(jobId);
    if (!timeoutId) return false;

    clearTimeout(timeoutId);
    this.scheduledJobs.delete(jobId);
    return true;
  }

  private calculateNextRecurringTime(config: RecurringConfig, now: Date): Date {
    const next = new Date(now);

    switch (config.frequency) {
      case 'minutely':
        next.setMinutes(next.getMinutes() + config.interval);
        break;
      case 'hourly':
        next.setHours(next.getHours() + config.interval);
        break;
      case 'daily':
        next.setDate(next.getDate() + config.interval);
        break;
      case 'weekly':
        next.setDate(next.getDate() + (7 * config.interval));
        break;
      case 'monthly':
        next.setMonth(next.getMonth() + config.interval);
        break;
    }

    // Apply time constraints
    if (config.startTime) {
      const [hours, minutes] = config.startTime.split(':').map(Number);
      next.setHours(hours, minutes, 0, 0);
    }

    return next;
  }

  private generateId(): string {
    return `timing_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateJobId(): string {
    return `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}