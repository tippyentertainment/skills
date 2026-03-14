import { TriggerManager } from './triggers/TriggerManager';
import { ChannelManager } from './channels/ChannelManager';
import { TimingEngine } from './timing/TimingEngine';
import { LogicRule, ExecutionResult, ChannelExecutionResult } from './types';

export class LogicLayer {
  private triggerManager: TriggerManager;
  private channelManager: ChannelManager;
  private timingEngine: TimingEngine;
  private rules: Map<string, LogicRule> = new Map();

  constructor() {
    this.triggerManager = new TriggerManager();
    this.channelManager = new ChannelManager();
    this.timingEngine = new TimingEngine();
  }

  async createRule(config: {
    name: string;
    description?: string;
    triggerConfig: Parameters<TriggerManager['createTrigger']>[0];
    channelConfigs: Parameters<ChannelManager['createChannel']>[0][];
    timingConfig: Parameters<TimingEngine['createTimingRule']>[0];
    priority?: number;
    conditions?: Parameters<TriggerManager['evaluateConditions']>[0];
  }): Promise<LogicRule> {
    const id = this.generateId();
    
    // Create trigger
    const trigger = await this.triggerManager.createTrigger(config.triggerConfig);
    
    // Create channels
    const channels = [];
    for (const channelConfig of config.channelConfigs) {
      const channel = await this.channelManager.createChannel(channelConfig);
      channels.push(channel);
    }
    
    // Create timing rule
    const timing = await this.timingEngine.createTimingRule(config.timingConfig);

    const rule: LogicRule = {
      id,
      name: config.name,
      description: config.description,
      trigger,
      channels,
      timing,
      enabled: true,
      priority: config.priority || 0,
      conditions: config.conditions,
    };

    this.rules.set(id, rule);
    return rule;
  }

  async executeRule(ruleId: string, context: Record<string, unknown> = {}): Promise<ExecutionResult> {
    const rule = this.rules.get(ruleId);
    if (!rule) {
      return {
        success: false,
        ruleId,
        triggerId: '',
        channelResults: [],
        executedAt: new Date(),
        duration: 0,
        error: 'Rule not found',
      };
    }

    if (!rule.enabled) {
      return {
        success: false,
        ruleId,
        triggerId: rule.trigger.id,
        channelResults: [],
        executedAt: new Date(),
        duration: 0,
        error: 'Rule is disabled',
      };
    }

    // Check timing
    const nextExecution = await this.timingEngine.getNextExecutionTime(rule.timing.id);
    if (!nextExecution) {
      return {
        success: false,
        ruleId,
        triggerId: rule.trigger.id,
        channelResults: [],
        executedAt: new Date(),
        duration: 0,
        error: 'Invalid timing configuration',
      };
    }

    // Check blackout windows
    const isInBlackout = await this.timingEngine.isInBlackoutWindow(rule.timing.id, new Date());
    if (isInBlackout) {
      return {
        success: false,
        ruleId,
        triggerId: rule.trigger.id,
        channelResults: [],
        executedAt: new Date(),
        duration: 0,
        error: 'Current time is within a blackout window',
      };
    }

    // Evaluate conditions
    if (rule.conditions && rule.conditions.length > 0) {
      const conditionsMet = await this.triggerManager.evaluateConditions(rule.conditions, context);
      if (!conditionsMet) {
        return {
          success: false,
          ruleId,
          triggerId: rule.trigger.id,
          channelResults: [],
          executedAt: new Date(),
          duration: 0,
          error: 'Conditions not met',
        };
      }
    }

    // Execute channels
    const startTime = Date.now();
    const channelResults: ChannelExecutionResult[] = [];

    // Sort channels by priority
    const sortedChannels = [...rule.channels].sort((a, b) => b.priority - a.priority);

    for (const channel of sortedChannels) {
      const result = await this.channelManager.executeChannel(channel.id, context);
      channelResults.push(result);
    }

    const duration = Date.now() - startTime;

    return {
      success: channelResults.every(r => r.success),
      ruleId,
      triggerId: rule.trigger.id,
      channelResults,
      executedAt: new Date(),
      duration,
    };
  }

  async enableRule(ruleId: string): Promise<boolean> {
    const rule = this.rules.get(ruleId);
    if (!rule) return false;
    rule.enabled = true;
    return true;
  }

  async disableRule(ruleId: string): Promise<boolean> {
    const rule = this.rules.get(ruleId);
    if (!rule) return false;
    rule.enabled = false;
    return true;
  }

  async getRule(ruleId: string): Promise<LogicRule | null> {
    return this.rules.get(ruleId) || null;
  }

  async listRules(filter?: { enabled?: boolean }): Promise<LogicRule[]> {
    let rules = Array.from(this.rules.values());
    if (filter?.enabled !== undefined) {
      rules = rules.filter(r => r.enabled === filter.enabled);
    }
    return rules.sort((a, b) => b.priority - a.priority);
  }

  async deleteRule(ruleId: string): Promise<boolean> {
    return this.rules.delete(ruleId);
  }

  private generateId(): string {
    return `rule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export { TriggerManager } from './triggers/TriggerManager';
export { ChannelManager } from './channels/ChannelManager';
export { TimingEngine } from './timing/TimingEngine';
export * from './types';