import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const handleClick = () => {
    window.open("https://wa.me/5513982156120?text=Olá! Gostaria de mais informações.", "_blank");
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 animate-pulse"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8" />
      </button>
    </>
  );
};

export default WhatsAppButton;
