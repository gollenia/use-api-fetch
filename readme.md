# useWpFetch

A React hook to simplify fetching data via the WordPress REST API using `@wordpress/api-fetch`.

## Features

-   Supports all HTTP methods (`GET`, `POST`, etc.)
-   Adds query args to the URL
-   Automatically sets headers including optional Nonce
-   Returns loading state, response data, error, and headers
-   Supports abort via `AbortController`
-   Works with JSON and FormData bodies

## Installation

```bash
npm install use-wp-fetch
```

## Usage

```js
import useWpFetch from "@gollenia/use-wp-fetch"

const MyComponent = () => {
    const { result, error, loading } = useWpFetch("/wp/v2/posts", {
        method: "GET",
        nonce: window.wpApiSettings?.nonce,
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <ul>
            {result?.map((post) => (
                <li key={post.id}>{post.title.rendered}</li>
            ))}
        </ul>
    )
}
```

## API

`useWpFetch(path, options)`

| Parameter | Type     | Default | Description                         |
| --------- | -------- | ------- | ----------------------------------- |
| `path`    | `string` | –       | REST API path (e.g. `/wp/v2/posts`) |
| `options` | `object` | `{}`    | Optional configuration              |

#### Options

| Option    | Type      | Default | Description                             |
| --------- | --------- | ------- | --------------------------------------- |
| `method`  | `string`  | `GET`   | HTTP method (`GET`, `POST`, etc.)       |
| `data`    | `object`  | –       | Body data (for `POST`, `PUT`, etc.)     |
| `nonce`   | `string`  | –       | Adds `X-WP-Nonce` header via middleware |
| `rootURL` | `string`  | –       | Overrides root URL via middleware       |
| `parse`   | `boolean` | `true`  | If `false`, skips auto JSON parsing     |

## Return Value

```ts
{
    result: any | null
    error: Error | null
    loading: boolean
}
```
