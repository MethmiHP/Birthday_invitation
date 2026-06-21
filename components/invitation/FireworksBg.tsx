'use client';

import { useEffect, useRef } from 'react';
import { Fireworks } from 'fireworks-js';

export default function FireworksBg() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const fireworks = new Fireworks(containerRef.current, {
            autoresize: true,
            opacity: 0.5,
            acceleration: 1.05,
            friction: 0.97,
            gravity: 1.5,
            particles: 50,
            traceLength: 3,
            traceSpeed: 10,
            explosion: 6,
            intensity: 40,
            flickering: 50,
            lineStyle: 'round',
            hue: {
                min: 30, // Gold/Yellow hue range
                max: 50
            },
            delay: {
                min: 15,
                max: 45
            },
            rocketsPoint: {
                min: 50,
                max: 50
            },
            lineWidth: {
                explosion: {
                    min: 1,
                    max: 4
                },
                trace: {
                    min: 1,
                    max: 2
                }
            },
            brightness: {
                min: 50,
                max: 90
            },
            decay: {
                min: 0.015,
                max: 0.03
            },
            mouse: {
                click: false,
                move: false,
                max: 1
            }
        });

        fireworks.start();

        return () => {
            fireworks.stop();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-10"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}
