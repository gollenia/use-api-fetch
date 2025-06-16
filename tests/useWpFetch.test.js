import { renderHook, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import useApiFetch from "../index.js"

// Mock @wordpress/api-fetch
vi.mock("@wordpress/api-fetch", () => {
    return {
        default: vi.fn(),
        createNonceMiddleware: vi.fn(),
        createRootURLMiddleware: vi.fn(),
    }
})

import apiFetch from "@wordpress/api-fetch"

describe("useApiFetch", () => {
    beforeEach(() => {
        apiFetch.mockReset()
    })

    it("calls apiFetch and returns data", async () => {
        const mockResponse = { success: true }
        apiFetch.mockResolvedValue(mockResponse)

        const { result } = renderHook(() =>
            useApiFetch("/wp-json/test", {
                method: "POST",
                data: { foo: "bar" },
            })
        )

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(apiFetch).toHaveBeenCalledWith(
            expect.objectContaining({
                path: "/wp-json/test",
                method: "POST",
                data: { foo: "bar" },
            })
        )

        expect(result.current.result).toEqual(mockResponse)
        expect(result.current.error).toBe(null)
    })
})
