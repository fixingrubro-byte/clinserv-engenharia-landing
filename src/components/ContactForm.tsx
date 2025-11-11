import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Send } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.phone || !formData.service) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    // Create WhatsApp message
    const message = `*Solicitação de Orçamento*\n\n*Nome:* ${formData.name}\n*Empresa:* ${formData.company || "Não informado"}\n*Email:* ${formData.email || "Não informado"}\n*Telefone:* ${formData.phone}\n*Serviço:* ${formData.service}\n*Mensagem:* ${formData.message || "Não informada"}`;
    
    const whatsappUrl = `https://wa.me/5513982156120?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    
    toast.success("Redirecionando para o WhatsApp...");
    
    // Reset form
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  return (
    <section id="orcamento" className="section-padding bg-primary text-primary-foreground">
      <div className="section-container max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Solicite um orçamento sem compromisso
          </h2>
          <p className="text-lg text-primary-foreground/90">
            Nossa equipe entrará em contato rapidamente para entender sua necessidade
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-lg p-8 shadow-2xl animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-card-foreground">
                Nome completo <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Seu nome"
                required
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-card-foreground">Empresa / Clínica</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Nome da empresa"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-card-foreground">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="seu@email.com"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-card-foreground">
                Telefone / WhatsApp <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(13) 98215-6120"
                required
                className="bg-background"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service" className="text-card-foreground">
              Tipo de serviço desejado <span className="text-destructive">*</span>
            </Label>
            <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })} required>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Selecione um serviço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manutencao-preventiva">Manutenção Preventiva</SelectItem>
                <SelectItem value="manutencao-corretiva">Manutenção Corretiva</SelectItem>
                <SelectItem value="fornecimento-pecas">Fornecimento de Peças</SelectItem>
                <SelectItem value="calibracao">Calibração Técnica</SelectItem>
                <SelectItem value="atendimento-emergencial">Atendimento Emergencial</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-card-foreground">Mensagem</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Descreva sua necessidade..."
              rows={4}
              className="bg-background resize-none"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg"
          >
            <Send className="mr-2 h-5 w-5" />
            Enviar Solicitação
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
