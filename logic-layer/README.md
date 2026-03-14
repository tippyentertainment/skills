# Logic Layer

A comprehensive TypeScript implementation for managing triggers, channel selection, and timing engines.

## Features

### Triggers
- **Webhook Triggers**: HTTP endpoints for external integrations
- **Schedule Triggers**: Cron-based scheduling
- **Event Triggers**: React to system events
- **Manual Triggers**: User-initiated actions
- **Condition Triggers**: Logic-based activation

### Channels
- **Email**: Send email notifications
- **SMS**: Text message delivery
- **Push**: Mobile push notifications
- **Webhook**: HTTP callbacks
- **Slack**: Slack channel messages
- **Discord**: Discord channel messages
- **In-App**: In-application notifications

### Timing Engine
- **Immediate**: Execute right away
- **Delayed**: Execute after a delay
- **Scheduled**: Execute at specific time
- **Recurring**: Execute repeatedly

## Installation

```bash
npm install logic-layer
```

## Usage

```typescript
import { LogicLayer } from 'logic-layer';

const logic = new LogicLayer();

// Create a rule
const rule = await logic.createRule({
  name: 'Daily Report',
  description: 'Send daily report via email and Slack',
  triggerConfig: {
    type: 'schedule',
    name: 'Daily Schedule',
    config: {
      cronExpression: '0 9 * * *',
      timezone: 'America/New_York'
    }
  },
  channelConfigs: [
    {
      type: 'email',
      name: 'Report Email',
      priority: 1,
      config: {
        emailAddress: 'team@example.com',
        emailTemplate: 'daily-report'
      }
    },
    {
      type: 'slack',
      name: 'Report Slack',
      priority: 2,
      config: {
        slackChannel: '#reports',
        slackWebhookUrl: 'https://hooks.slack.com/...'
      }
    }
  ],
  timingConfig: {
    mode: 'recurring',
    recurring: {
      frequency: 'daily',
      interval: 1,
      startTime: '09:00'
    }
  },
  priority: 10
});

// Execute the rule
const result = await logic.executeRule(rule.id, { report: '...' });
console.log(result);
```

## API

### LogicLayer

#### `createRule(config)`
Create a new logic rule with trigger, channels, and timing.

#### `executeRule(ruleId, context)`
Execute a rule with the given context.

#### `enableRule(ruleId)` / `disableRule(ruleId)`
Enable or disable a rule.

#### `getRule(ruleId)` / `listRules(filter)`
Query rules.

### TriggerManager

#### `createTrigger(config)`
Create a new trigger.

#### `evaluateConditions(conditions, context)`
Evaluate trigger conditions.

### ChannelManager

#### `createChannel(config)`
Create a new channel.

#### `selectChannels(criteria)`
Select channels based on criteria.

#### `executeChannel(channelId, payload)`
Execute a channel with payload.

### TimingEngine

#### `createTimingRule(config)`
Create a timing rule.

#### `getNextExecutionTime(ruleId)`
Get next execution time.

#### `isInBlackoutWindow(ruleId, time)`
Check if time is in blackout window.

#### `scheduleExecution(ruleId, callback)`
Schedule an execution.

## License

MIT