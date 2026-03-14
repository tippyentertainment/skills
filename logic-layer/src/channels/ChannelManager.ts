import { Channel, ChannelType, ChannelConfig, RateLimit, ChannelExecutionResult } from '../types';

export class ChannelManager {
  private channels: Map<string, Channel> = new Map();
  private rateLimitCounters: Map<string, { count: number; resetTime: number }> = new Map();

  async createChannel(config: {
    type: ChannelType;
    name: string;
    priority?: number;
    config: ChannelConfig;
    rateLimits?: RateLimit;
  }): Promise<Channel> {
    const id = this.generateId();
    
    const channel: Channel = {
      id,
      type: config.type,
      name: config.name,
      enabled: true,
      priority: config.priority || 0,
      config: config.config,
      rateLimits: config.rateLimits,
    };

    this.channels.set(id, channel);
    return channel;
  }

  async selectChannels(
    criteria: {
      types?: ChannelType[];
      priorities?: number[];
      enabled?: boolean;
    } = {}
  ): Promise<Channel[]> {
    let channels = Array.from(this.channels.values());

    if (criteria.types) {
      channels = channels.filter(c => criteria.types!.includes(c.type));
    }
    if (criteria.priorities) {
      channels = channels.filter(c => criteria.priorities!.includes(c.priority));
    }
    if (criteria.enabled !== undefined) {
      channels = channels.filter(c => c.enabled === criteria.enabled);
    }

    // Sort by priority (higher first)
    channels.sort((a, b) => b.priority - a.priority);

    return channels;
  }

  async executeChannel(
    channelId: string,
    payload: Record<string, unknown>
  ): Promise<ChannelExecutionResult> {
    const channel = this.channels.get(channelId);
    if (!channel) {
      return {
        channelId,
        channelType: 'email',
        success: false,
        responseTime: 0,
        error: 'Channel not found',
      };
    }

    // Check rate limits
    if (!await this.checkRateLimit(channelId, channel.rateLimits)) {
      return {
        channelId,
        channelType: channel.type,
        success: false,
        responseTime: 0,
        error: 'Rate limit exceeded',
      };
    }

    const startTime = Date.now();

    try {
      let result: ChannelExecutionResult;

      switch (channel.type) {
        case 'email':
          result = await this.sendEmail(channel, payload);
          break;
        case 'sms':
          result = await this.sendSMS(channel, payload);
          break;
        case 'push':
          result = await this.sendPush(channel, payload);
          break;
        case 'webhook':
          result = await this.sendWebhook(channel, payload);
          break;
        case 'slack':
          result = await this.sendSlack(channel, payload);
          break;
        case 'discord':
          result = await this.sendDiscord(channel, payload);
          break;
        case 'in-app':
          result = await this.sendInApp(channel, payload);
          break;
        default:
          throw new Error(`Unknown channel type: ${channel.type}`);
      }

      return result;
    } catch (error) {
      return {
        channelId,
        channelType: channel.type,
        success: false,
        responseTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private async checkRateLimit(channelId: string, rateLimits?: RateLimit): Promise<boolean> {
    if (!rateLimits) return true;

    const now = Date.now();
    const counter = this.rateLimitCounters.get(channelId) || { count: 0, resetTime: now + 60000 };

    if (now > counter.resetTime) {
      counter.count = 0;
      counter.resetTime = now + 60000;
    }

    if (rateLimits.maxPerMinute && counter.count >= rateLimits.maxPerMinute) {
      return false;
    }

    counter.count++;
    this.rateLimitCounters.set(channelId, counter);
    return true;
  }

  private async sendEmail(channel: Channel, payload: Record<string, unknown>): Promise<ChannelExecutionResult> {
    // Email sending implementation
    return {
      channelId: channel.id,
      channelType: 'email',
      success: true,
      responseTime: 50,
      metadata: { sent: true },
    };
  }

  private async sendSMS(channel: Channel, payload: Record<string, unknown>): Promise<ChannelExecutionResult> {
    // SMS sending implementation
    return {
      channelId: channel.id,
      channelType: 'sms',
      success: true,
      responseTime: 100,
      metadata: { sent: true },
    };
  }

  private async sendPush(channel: Channel, payload: Record<string, unknown>): Promise<ChannelExecutionResult> {
    // Push notification implementation
    return {
      channelId: channel.id,
      channelType: 'push',
      success: true,
      responseTime: 30,
      metadata: { sent: true },
    };
  }

  private async sendWebhook(channel: Channel, payload: Record<string, unknown>): Promise<ChannelExecutionResult> {
    // Webhook implementation
    return {
      channelId: channel.id,
      channelType: 'webhook',
      success: true,
      responseTime: 200,
      metadata: { sent: true },
    };
  }

  private async sendSlack(channel: Channel, payload: Record<string, unknown>): Promise<ChannelExecutionResult> {
    // Slack implementation
    return {
      channelId: channel.id,
      channelType: 'slack',
      success: true,
      responseTime: 150,
      metadata: { sent: true },
    };
  }

  private async sendDiscord(channel: Channel, payload: Record<string, unknown>): Promise<ChannelExecutionResult> {
    // Discord implementation
    return {
      channelId: channel.id,
      channelType: 'discord',
      success: true,
      responseTime: 120,
      metadata: { sent: true },
    };
  }

  private async sendInApp(channel: Channel, payload: Record<string, unknown>): Promise<ChannelExecutionResult> {
    // In-app notification implementation
    return {
      channelId: channel.id,
      channelType: 'in-app',
      success: true,
      responseTime: 10,
      metadata: { sent: true },
    };
  }

  private generateId(): string {
    return `channel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}