import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';

interface AccordionProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const Accordion = ({ children, isOpen }: AccordionProps) => {
  const contentVariants = {
    open: { opacity: 1, height: 'auto' },
    collapsed: { opacity: 0, height: 0 },
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            variants={contentVariants}
            initial="collapsed"
            animate="open"
            exit="collapsed"
          >
            {children}
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

export default Accordion;
