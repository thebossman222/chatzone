import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/*
 * A React component that ensures its children are only rendered on the client side
 * This is useful for components that rely on browser-specific APIs or behaviors
 * It uses the useSyncExternalStore hook to determine if the code is running on the server or client
 * If on the server, it returns null, effectively preventing server-side rendering of its children
 * If on the client, it renders its children as normal
 * @param {Object} props - The props object
 * @param {React.ReactNode} props.children - The child components to be rendered on the client side
 * @returns {React.ReactNode | null} The children if on the client, otherwise null
 */
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const isServer = useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true
  );

  return isServer ? null : children;
}
