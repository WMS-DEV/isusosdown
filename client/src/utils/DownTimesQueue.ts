import {
  DownTime,
  EndedDownTime,
  FullDownTime,
  StartedDownTime,
} from '../types/main.types';
import config from '../config.json';
import {
  isEndedDownTime,
  isFullDownTime,
  isStartedDownTime,
} from '../lib/typeGuards';

const MINIMUM_DOWNTIME_DURATION_MS = config.minimumDowntimeDuration;

export class DownTimesQueue {
  constructor(private readonly queue: DownTime[] = []) {}

  public push(message: DownTime) {
    if (this.isNewDowntimeRepeated(message)) {
      return;
    } else if (this.isNewDownTimeOverlappingWithLastDownTime(message)) {
      this.appendDownTimeFinishToLastDownTime({
        downTill: message.downTill,
      });
    }
    // Last downtime is finished with new message with downTill
    else if (this.isLastDownTimeFinishedWithNewDownTime(message)) {
      this.appendDownTimeFinishToLastDownTime(message);
    }

    // Last downtime is finished, and new downtime is starting
    else if (this.hasNewDownTimeStarted(message)) {
      this.addNewDownTime(message);
    }
  }

  public peakLastDownTime() {
    return this.getLastDownTime();
  }

  private hasNewDownTimeStarted(
    downTime: DownTime,
  ): downTime is StartedDownTime | FullDownTime {
    if (isEndedDownTime(downTime)) {
      return false;
    }

    return (
      (isStartedDownTime(downTime) || isFullDownTime(downTime)) &&
      (this.isQueueEmpty() || this.isLastDownTimeFinished())
    );
  }
  private isNewDowntimeRepeated(downTime: DownTime) {
    if (this.isQueueEmpty()) {
      return false;
    }

    const lastDownTime = this.getLastDownTime();
    if (isStartedDownTime(lastDownTime) && isStartedDownTime(downTime)) {
      return lastDownTime.downSince === downTime.downSince;
    } else if (isFullDownTime(lastDownTime) && isFullDownTime(downTime)) {
      return (
        lastDownTime.downSince === downTime.downSince &&
        lastDownTime.downTill === downTime.downTill
      );
    } else if (isEndedDownTime(lastDownTime) && isEndedDownTime(downTime)) {
      return lastDownTime.downTill === downTime.downTill;
    }
    return false;
  }

  private addNewDownTime(downTime: StartedDownTime | FullDownTime) {
    if (
      this.isLastDownTimeFinished() &&
      ((isFullDownTime(downTime) &&
        DownTimesQueue.isDownTimeDurationLongEnough(downTime, downTime)) ||
        isStartedDownTime(downTime))
    ) {
      delete (downTime as any).service;
      this.queue.push(downTime);
    }
  }

  private isNewDownTimeOverlappingWithLastDownTime(
    downtime: DownTime,
  ): downtime is FullDownTime {
    if (this.isQueueEmpty() || !isFullDownTime(downtime)) {
      return false;
    }

    const lastDownTime = this.getLastDownTime();

    return (
      isStartedDownTime(lastDownTime) &&
      downtime.downSince === lastDownTime.downSince
    );
  }

  private static isDownTimeDurationLongEnough(
    startDownTime: StartedDownTime,
    endDownTime: EndedDownTime,
  ) {
    return (
      endDownTime.downTill - startDownTime.downSince >
      MINIMUM_DOWNTIME_DURATION_MS
    );
  }

  private appendDownTimeFinishToLastDownTime(downTime: EndedDownTime) {
    const lastDownTime = this.getLastDownTime();

    if (
      DownTimesQueue.isDownTimeDurationLongEnough(
        lastDownTime as StartedDownTime,
        downTime,
      )
    ) {
      (lastDownTime as FullDownTime).downTill = downTime.downTill;
    } else {
      this.queue.pop();
    }
  }

  private isLastDownTimeFinishedWithNewDownTime(
    downTime: DownTime,
  ): downTime is EndedDownTime {
    if (
      isEndedDownTime(downTime) &&
      isStartedDownTime(this.getLastDownTime())
    ) {
      return true;
    }

    return false;
  }

  public isLastDownTimeFinished() {
    if (this.queue.length == 0) {
      return true;
    }
    return (
      isEndedDownTime(this.getLastDownTime()) ||
      isFullDownTime(this.getLastDownTime())
    );
  }
  private isQueueEmpty() {
    return this.queue.length === 0;
  }

  private getLastDownTime() {
    return this.queue[this.queue.length - 1];
  }

  public getQueue() {
    return [...this.queue];
  }
}
