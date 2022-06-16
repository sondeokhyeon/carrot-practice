import { cls } from "../libs/utils";

interface floatButtonProps {
  styles?: string[];
  children: React.ReactNode;
}

const FloatButton = ({ children, styles }: floatButtonProps) => {
  return (
    <button
      className={cls(
        `fixed bottom-24 right-5 bg-orange-400 rounded-full p-3 text-white shadow-xl hover:bg-orange-500  cursor-pointer transition-colors ${
          styles ? [...styles] : ""
        }`
      )}
    >
      {children}
    </button>
  );
};

export default FloatButton;
