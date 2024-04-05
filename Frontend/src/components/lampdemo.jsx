import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";


export function LampDemo({name}) {
  console.log(name);
  
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
       <br /> Movie Cinema <br/><span className="text-slate-300" style={{fontSize:'2.5rem'}}>{`Your Space ${name}`}</span>
      </motion.h1>
    </LampContainer>
  );
}
