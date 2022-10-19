export function detectDOM(queryString: string): Promise<void> {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const dom = document.querySelector(queryString);
      if (dom) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });
}
