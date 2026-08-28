import { motion, useReducedMotion } from "framer-motion"
import heroPizza from "@/assets/images/hero-pizza.avif"

const EASE_OUT = [0.22, 1, 0.36, 1] as const

export function HeroIllustration() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-lg"
      aria-hidden="true"
    >
      {/* Soft background shape */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1 }
            : {
                opacity: 1,
                scale: [1, 1.04, 1],
                rotate: [6, 10, 6],
              }
        }
        transition={{
          opacity: { duration: 0.6 },
          scale: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="absolute inset-[8%] rounded-[3rem] bg-primary/10"
      />

      {/* Decorative outline */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1 }
            : {
                opacity: 1,
                scale: 1,
                rotate: [0, 360],
              }
        }
        transition={{
          opacity: { duration: 0.7, delay: 0.2 },
          scale: { duration: 0.7, delay: 0.2, ease: EASE_OUT },
          rotate: {
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        className="absolute inset-[3%] rounded-[45%] border border-primary/30"
      />

      {/* Main image frame */}
      <motion.div
        initial={
          prefersReducedMotion
            ? false
            : {
                opacity: 0,
                scale: 0.92,
                rotate: -5,
                y: 24,
              }
        }
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 3,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: EASE_OUT,
        }}
        className="absolute inset-[8%] overflow-hidden rounded-[2.5rem] border-4 border-white shadow-xl"
      >
        {/* Slow cinematic image movement */}
        <motion.img
          src={heroPizza}
          alt=""
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  scale: [1, 1.06, 1],
                  x: [0, -8, 0],
                  y: [0, -5, 0],
                }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Floating accent */}
      {!prefersReducedMotion && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -12, 0],
            rotate: [-8, 8, -8],
          }}
          transition={{
            opacity: { duration: 0.4, delay: 0.7 },
            scale: {
              type: "spring",
              stiffness: 260,
              damping: 18,
              delay: 0.7,
            },
            y: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="absolute top-[8%] left-[2%] size-5 rounded-full bg-primary/80"
        />
      )}

      {/* Small floating accent */}
      {!prefersReducedMotion && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, 10, 0],
            x: [0, 5, 0],
          }}
          transition={{
            opacity: { duration: 0.4, delay: 0.9 },
            scale: {
              type: "spring",
              stiffness: 260,
              damping: 18,
              delay: 0.9,
            },
            y: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            },
            x: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            },
          }}
          className="absolute right-[4%] bottom-[16%] size-3 rounded-full bg-primary/60"
        />
      )}
    </div>
  )
}