import { describe, it, expect } from "vitest"
import {calculateFullStats, getCurrentMonthStats} from "@utils/statisticUtils"
import { COMMENTS, LIKES, RESULT_COMMENT_STATS, RESULT_LIKE_STATS } from "@/consts/testConst"

describe("calculateFullStats", () => {
    it('likes', () => {
expect(calculateFullStats(LIKES)).toStrictEqual(RESULT_LIKE_STATS)
    })

    it('comment', () => {
expect(calculateFullStats(COMMENTS)).toStrictEqual(RESULT_COMMENT_STATS)
    })
})

describe("getCurrentMonthStats", () => {
    it('likes - september 2025', () => {
        expect(getCurrentMonthStats(new Date("2025-09-02T12:00:00Z"), RESULT_LIKE_STATS)).toEqual({
            "month": 8,
            "count": 2,
            "previousCount": 0
        });
    });

    it('comment - september 2025', () => {
        expect(getCurrentMonthStats(new Date("2025-09-02T12:00:00Z"), RESULT_COMMENT_STATS)).toEqual({
            "month": 8, 
            "count": 2,
            "previousCount": 0
        });
    });
})