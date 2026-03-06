import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { formattedDate } from "./dateFormatter";

describe('formattedDate', () => {
  let currentTime: number;
  
  beforeEach(() => {
    currentTime = Date.now();
    vi.useFakeTimers();
    vi.setSystemTime(currentTime);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('just now (less than 60 seconds)', () => {
    it('returns "now" for current time', () => {
      expect(formattedDate(new Date(currentTime).toISOString())).toStrictEqual({
        "key": "time.now",
      });
    });

    it('returns "now" for 1 second ago', () => {
      expect(formattedDate(new Date(currentTime - 1000).toISOString())).toStrictEqual({
        "key": "time.now",
      });
    });

    it('returns "now" for 30 seconds ago', () => {
      expect(formattedDate(new Date(currentTime - 30 * 1000).toISOString())).toStrictEqual({
        "key": "time.now",
      });
    });

    it('returns "now" for 59 seconds ago', () => {
      expect(formattedDate(new Date(currentTime - 59 * 1000).toISOString())).toStrictEqual({
        "key": "time.now",
      });
    });

    it('returns "now" for 59.999 seconds ago', () => {
      expect(formattedDate(new Date(currentTime - 59999).toISOString())).toStrictEqual({
        "key": "time.now",
      });
    });
  });

  describe('minutes ago (1-59 minutes)', () => {
    it('returns "1m ago" for 1 minute ago', () => {
      expect(formattedDate(new Date(currentTime - 60 * 1000).toISOString())).toStrictEqual({
        count: 1,
        key: "time.minute",
      });
    });

    it('returns "1m ago" for 1 minute 30 seconds ago', () => {
      expect(formattedDate(new Date(currentTime - 90 * 1000).toISOString())).toStrictEqual({
        count: 1,
        key: "time.minute",
      });
    });

    it('returns "5m ago" for 5 minutes ago', () => {
      expect(formattedDate(new Date(currentTime - 5 * 60 * 1000).toISOString())).toStrictEqual({
        count: 5,
        key: "time.minute",
      });
    });

    it('returns "30m ago" for 30 minutes ago', () => {
      expect(formattedDate(new Date(currentTime - 30 * 60 * 1000).toISOString())).toStrictEqual({
        count: 30,
        key: "time.minute",
      });
    });

    it('returns "59m ago" for 59 minutes ago', () => {
      expect(formattedDate(new Date(currentTime - 59 * 60 * 1000).toISOString())).toStrictEqual({
        count: 59,
        key: "time.minute",
      });
    });

    it('returns "59m ago" for 59 minutes 59 seconds ago', () => {
      expect(formattedDate(new Date(currentTime - (59 * 60 + 59) * 1000).toISOString())).toStrictEqual({
        count: 59,
        key: "time.minute",
      });
    });
  });

  describe('hours ago (1-23 hours)', () => {
    it('returns "1h ago" for 1 hour ago', () => {
      expect(formattedDate(new Date(currentTime - 60 * 60 * 1000).toISOString())).toStrictEqual({
        count: 1,
        key: "time.hour",
      });
    });

    it('returns "1h ago" for 1 hour 30 minutes ago', () => {
      expect(formattedDate(new Date(currentTime - (60 + 30) * 60 * 1000).toISOString())).toStrictEqual({
        count: 1,
        key: "time.hour",
      });
    });

    it('returns "3h ago" for 3 hours ago', () => {
      expect(formattedDate(new Date(currentTime - 3 * 60 * 60 * 1000).toISOString())).toStrictEqual({
        count: 3,
        key: "time.hour",
      });
    });

    it('returns "12h ago" for 12 hours ago', () => {
      expect(formattedDate(new Date(currentTime - 12 * 60 * 60 * 1000).toISOString())).toStrictEqual({
        count: 12,
        key: "time.hour",
      });
    });

    it('returns "23h ago" for 23 hours ago', () => {
      expect(formattedDate(new Date(currentTime - 23 * 60 * 60 * 1000).toISOString())).toStrictEqual({
        count: 23,
        key: "time.hour",
      });
    });

    it('returns "23h ago" for 23 hours 59 minutes ago', () => {
      expect(formattedDate(new Date(currentTime - (23 * 60 + 59) * 60 * 1000).toISOString())).toStrictEqual({
        count: 23,
        key: "time.hour",
      });
    });
  });

  describe('days ago (1-6 days)', () => {
    it('returns "1d ago" for 1 day ago', () => {
      expect(formattedDate(new Date(currentTime - 24 * 60 * 60 * 1000).toISOString())).toStrictEqual({
        count: 1,
        key: "time.day",
      });
    });

    it('returns "2d ago" for 2 days ago', () => {
      expect(formattedDate(new Date(currentTime - 2 * 24 * 60 * 60 * 1000).toISOString())).toStrictEqual({
        count: 2,
        key: "time.day",
      });
    });

    it('returns "6d ago" for 6 days ago', () => {
      expect(formattedDate(new Date(currentTime - 6 * 24 * 60 * 60 * 1000).toISOString())).toStrictEqual({
        count: 6,
        key: "time.day",
      });
    });

    it('returns "6d ago" for 6 days 23 hours ago', () => {
      expect(formattedDate(new Date(currentTime - (6 * 24 + 23) * 60 * 60 * 1000).toISOString())).toStrictEqual({
        count: 6,
        key: "time.day",
      });
    });
  });

  describe('weeks ago (1-3 weeks)', () => {
    it('returns "1w ago" for 7 days ago', () => {
      expect(formattedDate(new Date(currentTime - 7 * 24 * 60 * 60 * 1000).toISOString())).toStrictEqual({
        count: 1,
        key: "time.week",
      });
    });

    it('returns "1w ago" for 10 days ago', () => {
      expect(formattedDate(new Date(currentTime - 10 * 24 * 60 * 60 * 1000).toISOString())).toStrictEqual({
        count: 1,
        key: "time.week",
      });
    });

    it('returns "2w ago" for 14 days ago', () => {
      expect(formattedDate(new Date(currentTime - 14 * 24 * 60 * 60 * 1000).toISOString())).toStrictEqual({
        count: 2,
        key: "time.week",
      });
    });

    it('returns "3w ago" for 21 days ago', () => {
      expect(formattedDate(new Date(currentTime - 21 * 24 * 60 * 60 * 1000).toISOString())).toStrictEqual({
        count: 3,
        key: "time.week",
      });
    });

    it('returns "3w ago" for 27 days ago (almost 4 weeks)', () => {
      expect(formattedDate(new Date(currentTime - 27 * 24 * 60 * 60 * 1000).toISOString())).toStrictEqual({
        count: 3,
        key: "time.week",
      });
    });
  });

  describe('months ago (1-11 months)', () => {
    it('returns "1mth ago" for 28 days ago (4 weeks)', () => {
      expect(formattedDate(new Date(currentTime - 28 * 24 * 60 * 60 * 1000).toISOString())).toStrictEqual({
        count: 1,
        key: "time.month",
      });
    });

    it('returns "2mth ago" for 8 weeks ago', () => {
      expect(formattedDate(new Date(currentTime - 8 * 7 * 24 * 60 * 60 * 1000).toISOString())).toStrictEqual({
        count: 2,
        key: "time.month",
      });
    });

    it('returns "4mth ago" for 16 weeks ago', () => {
      expect(formattedDate(new Date(currentTime - 16 * 7 * 24 * 60 * 60 * 1000).toISOString())).toStrictEqual({
        count: 4,
        key: "time.month",
      });
    });

    it('returns "11mth ago" for 44 weeks ago', () => {
      expect(formattedDate(new Date(currentTime - 44 * 7 * 24 * 60 * 60 * 1000).toISOString())).toStrictEqual({
        count: 11,
        key: "time.month",
      });
    });
  });

  describe('years ago (full date format)', () => {
    it('returns formatted date for 1 year ago', () => {
      const oneYearAgo = new Date(currentTime);
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      
      const result = formattedDate(oneYearAgo.toISOString());
      const expectedDate = oneYearAgo.toLocaleDateString();
      
      expect(result).toStrictEqual({
        "date": expectedDate,
        "key": "time.fullDate",
      })
    });

    it('returns formatted date for 2 years ago', () => {
      const twoYearsAgo = new Date(currentTime);
      twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
      
      const result = formattedDate(twoYearsAgo.toISOString());
      expect(result).toStrictEqual({
        "date": twoYearsAgo.toLocaleDateString(),
        "key": "time.fullDate",
      }
      );
    });

    it('returns formatted date for very old date', () => {
      const oldDate = new Date('2020-01-01T00:00:00.000Z');
      const result = formattedDate(oldDate.toISOString());
      expect(result).toStrictEqual({
        "date": "1/1/2020",
        "key": "time.fullDate",
      });
    });
  });

  describe('edge cases', () => {
    it('handles exact boundaries correctly', () => {
      expect(formattedDate(new Date(currentTime - 60 * 1000).toISOString())).toStrictEqual({
        count: 1,
        key: "time.minute",
      });

      // 60 minutes = 1 hour
      expect(formattedDate(new Date(currentTime - 60 * 60 * 1000).toISOString())).toStrictEqual({
        count: 1,
        key: "time.hour",
      });

      // 24 hours = 1 day
      expect(formattedDate(new Date(currentTime - 24 * 60 * 60 * 1000).toISOString())).toStrictEqual({
        count: 1,
        key: "time.day",
      });
      
      // 7 days = 1 week
      expect(formattedDate(new Date(currentTime - 7 * 24 * 60 * 60 * 1000).toISOString())).toStrictEqual({
        count: 1,
        key: "time.week",
      });

      expect(formattedDate(new Date(currentTime - 4 * 7 * 24 * 60 * 60 * 1000).toISOString())).toStrictEqual({
        count: 1,
        key: "time.month",
      });
    });

    it('handles invalid date gracefully', () => {
      expect(formattedDate('invalid-date')).toStrictEqual({
        "date": "Invalid Date",
        "key": "time.fullDate",
      });
      expect(formattedDate('')).toStrictEqual({
        "date": "Invalid Date",
        "key": "time.fullDate",
      });
    });

    it('handles future dates', () => {
      const futureDate = new Date(currentTime + 24 * 60 * 60 * 1000);
      expect(formattedDate(futureDate.toISOString())).toStrictEqual({
        "key": "time.now",
      });
    });
  });
});