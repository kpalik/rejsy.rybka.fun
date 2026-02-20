import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cruises } from "@/lib/cruises";
import { toast } from "sonner";

const formSchema = z.object({
    name: z.string().min(2, "Imię i nazwisko musi mieć co najmniej 2 znaki"),
    email: z.string().email("Niepoprawny adres email"),
    phone: z.string().min(9, "Numer telefonu musi mieć co najmniej 9 cyfr"),
    cruise: z.string().min(1, "Proszę wybrać rejs"),
});

interface RegistrationModalProps {
    children: React.ReactNode;
}

export const RegistrationModal = ({ children }: RegistrationModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            cruise: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/submit-registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error("Błąd podczas wysyłania zgłoszenia");
            }

            toast.success("Zgłoszenie zostało wysłane pomyślnie!");
            setIsOpen(false);
            form.reset();
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Wystąpił błąd. Spróbuj ponownie później.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Zapisz się na rejs</DialogTitle>
                    <DialogDescription>
                        Zostaw nam swoje dane, a skontaktujemy się z Tobą w celu ustalenia
                        szczegółów.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Imię i Nazwisko</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Jan Kowalski" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="jan@example.com" type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Numer telefonu</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+48 123 456 789" type="tel" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cruise"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Wybierz rejs</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Wybierz interesujący Cię rejs" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {cruises.map((cruise) => (
                                                <SelectItem key={cruise.title} value={cruise.title}>
                                                    {cruise.title} ({cruise.date})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Wysyłanie..." : "Wyślij zgłoszenie"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
