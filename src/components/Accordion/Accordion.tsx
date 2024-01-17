import { motion, AnimatePresence } from 'framer-motion';

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
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          variants={contentVariants}
          initial="collapsed"
          animate="open"
          exit="collapsed"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Accordion;
