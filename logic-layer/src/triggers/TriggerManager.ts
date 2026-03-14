import { Trigger, TriggerType, TriggerConfig, Condition } from '../types';

export class TriggerManager {
  private triggers: Map<string, Trigger> = new Map();
  private webhookHandlers: Map<string, (data: unknown) => Promise<boolean>> = new Map();

  async createTrigger(config: {
    type: TriggerType;
    name: string;
    description?: string;
    config: TriggerConfig;
  }): Promise<Trigger> {
    const id = this.generateId();
    const now = new Date();
    
    const trigger: Trigger = {
      id,
      type: config.type,
      name: config.name,
      description: config.description,
      enabled: true,
      config: config.config,
      createdAt: now,
      updatedAt: now,
    };

    this.triggers.set(id, trigger);
    
    if (config.type === 'webhook') {
      this.registerWebhookHandler(trigger);
    }

    return trigger;
  }

  async updateTrigger(id: string, updates: Partial<Trigger>): Promise<Trigger | null> {
    const trigger = this.triggers.get(id);
    if (!trigger) return null;

    const updated = {
      ...trigger,
      ...updates,
      updatedAt: new Date(),
    };

    this.triggers.set(id, updated);
    return updated;
  }

  async deleteTrigger(id: string): Promise<boolean> {
    return this.triggers.delete(id);
  }

  async getTrigger(id: string): Promise<Trigger | null> {
    return this.triggers.get(id) || null;
  }

  async listTriggers(filter?: { type?: TriggerType; enabled?: boolean }): Promise<Trigger[]> {
    let triggers = Array.from(this.triggers.values());
    
    if (filter?.type) {
      triggers = triggers.filter(t => t.type === filter.type);
    }
    if (filter?.enabled !== undefined) {
      triggers = triggers.filter(t => t.enabled === filter.enabled);
    }
    
    return triggers;
  }

  async evaluateConditions(conditions: Condition[], context: Record<string, unknown>): Promise<boolean> {
    for (const condition of conditions) {
      const fieldValue = context[condition.field];
      
      switch (condition.operator) {
        case 'equals':
          if (fieldValue !== condition.value) return false;
          break;
        case 'not_equals':
          if (fieldValue === condition.value) return false;
          break;
        case 'contains':
          if (typeof fieldValue !== 'string' || !fieldValue.includes(condition.value as string)) return false;
          break;
        case 'greater_than':
          if (typeof fieldValue !== 'number' || fieldValue <= (condition.value as number)) return false;
          break;
        case 'less_than':
          if (typeof fieldValue !== 'number' || fieldValue >= (condition.value as number)) return false;
          break;
        case 'exists':
          if (fieldValue === undefined || fieldValue === null) return false;
          break;
      }
    }
    
    return true;
  }

  private registerWebhookHandler(trigger: Trigger): void {
    if (trigger.config.webhookPath) {
      this.webhookHandlers.set(trigger.config.webhookPath, async (data: unknown) => {
        if (trigger.config.webhookSecret) {
          // Validate webhook secret
        }
        return true;
      });
    }
  }

  private generateId(): string {
    return `trigger_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}