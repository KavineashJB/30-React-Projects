import { motion } from "framer-motion";

type Props = {
  value: string | null;
  index: number;
  handleClick: (index: number) => void;
};
const Square = ({ value, index, handleClick }: Props) => {
  return (
    <motion.button
      className="w-[90px] h-[90px] font-bold text-4xl bg-[#1E293B] cursor-pointer flex items-center justify-center"
      whileTap={{ scale: 0.9 }}
      onClick={() => handleClick(index)}
    >
      {value}
    </motion.button>
  );
};

export default Square;
