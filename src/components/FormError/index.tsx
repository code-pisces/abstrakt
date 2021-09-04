// dependencies imports
import { motion } from 'framer-motion';
import { FiAlertOctagon } from 'react-icons/fi';
// code imports
import { Wrapper } from './styles';

export const FormError = ({ children, isEmpty }) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  return (
    <>
      {!isEmpty && (
        <Wrapper>
          <motion.div initial="hidden" animate="visible" variants={variants}>
            <FiAlertOctagon />
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={variants}>
            {children}
          </motion.div>
        </Wrapper>
      )}
    </>
  );
};
