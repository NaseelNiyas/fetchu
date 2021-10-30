import { motion, Transition } from 'framer-motion';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const animation: Transition = {
  loop: Infinity,
  ease: 'linear',
  duration: 1,
};

const Loader = () => {
  return (
      <motion.div transition={animation} animate={{ rotate: 360 }}>
        <AiOutlineLoading3Quarters />
      </motion.div>
  );
};

export default Loader;
