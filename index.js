import apiFetch from "@wordpress/api-fetch"
import { useEffect, useState } from "react"

const useApiFetch = (path, options = {}) => {
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController()

        if (options.nonce) {
            apiFetch.use(
                apiFetch.createNonceMiddleware({ nonce: options.nonce })
            )
            options.nonce = undefined
        }

        if (options.rootURL) {
            apiFetch.use(
                apiFetch.createRootURLMiddleware({ rootURL: options.rootURL })
            )
            options.rootURL = undefined
        }

        const doFetch = async () => {
            setLoading(true)
            try {
                const response = await apiFetch({
                    path,
                    method: options.method || "GET",
                    data: options.data,
                    signal: controller.signal,
                    parse: options.parse !== false,
                })
                setResult(response)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        doFetch()

        return () => controller.abort()
    }, [path, JSON.stringify(options)])

    return { result, error, loading }
}

export default useApiFetch
