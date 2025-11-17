import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const handleClick = () => {
    window.open("https://wa.me/5513982156120?text=Vim+Pelo+Site", "_blank");
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 md:w-18 md:h-18 bg-gradient-to-br from-accent to-accent-glow hover:from-accent-glow hover:to-accent text-accent-foreground rounded-full shadow-2xl hover:shadow-accent flex items-center justify-center transition-all duration-300 hover:scale-110 animate-pulse group"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="w-8 h-8 md:w-9 md:h-9 group-hover:rotate-12 transition-transform" />
      </button>
    </>
  );
};

export default WhatsAppButton;
