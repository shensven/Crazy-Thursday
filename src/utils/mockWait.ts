const mockWait = (timeout: number | undefined) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default mockWait;
