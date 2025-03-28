export interface TimeSpanDto {
    ticks: number; // integer($int64)
    days: number; // integer($int32)
    hours: number; // integer($int32)
    milliseconds: number; // integer($int32)
    microseconds: number; // integer($int32)
    nanoseconds: number; // integer($int32)
    minutes: number; // integer($int32)
    seconds: number; // integer($int32)
    totalDays: number; // number($double)
    totalHours: number; // number($double)
    totalMilliseconds: number; // number($double)
    totalMicroseconds: number; // number($double)
    totalNanoseconds: number; // number($double)
    totalMinutes: number; // number($double)
    totalSeconds: number; // number($double)
  }
  