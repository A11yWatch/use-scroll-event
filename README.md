## use-scroll-event

A scroll event hook for React that tracks page position and detects active scrolling.

## Installation Instructions

```bash
$ yarn add use-scroll-event
```

## Example

```typescript
import { useScrollEvent } from "use-scroll-event";

function App() {
  // detectScrolling: optional for scrolling detection - optimization
  const { scrolling, x, y } = useScrollEvent({ detectScrolling: true });
}
```
