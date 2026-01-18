import { useEffect, useState } from 'react';

export function FloatingHearts() {
  const [hearts, setHearts] = useState<number[]>([]);

  useEffect(() => {
    // Create initial hearts
    const initialHearts = Array.from({ length: 15 }, (_, i) => i);
    setHearts(initialHearts);
  }, []);

  return (
    <div className="floating-hearts">
      {hearts.map((i) => (
        <div
          key={i}
          className="heart"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${6 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`,
            backgroundColor: `hsla(${330 + Math.random() * 30}, 80%, 60%, ${0.1 + Math.random() * 0.2})`
          }}
        />
      ))}
    </div>
  );
}
