"use client";

import * as Z from "zod";
import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/image-upload";

interface CompanionIdPageProps {
    initialData: Companion | null;
    categories: Category[];
}

const formSchema = Z.object({
    name: Z.string().min(1, {
        message: "Name is required.",
    }),
    descripttion: Z.string().min(1, {
        message: "Description is required.",
    }),
    instructions: Z.string().min(200, {
        message: "Instructions require at lest 200 characters.",
    }),
    seed: Z.string().min(200, {
        message: "Seed require at lest 200 characters.",
    }),
    src: Z.string().min(1, {
        message: "Image is required.",
    }),
    categoryId: Z.string().min(1, {
        message: "Category is required.",
    }),
})

export const CompanionForm = ({
    categories,
    initialData
}: CompanionIdPageProps) => {
    const form = useForm<Z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            instructions: "",
            seed: "",
            src: "",
            categoryId: undefined,
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: Z.infer<typeof formSchema>) => {
        console.log(values);
    }


    return (
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
                    <div className="space-y-2 w-full">
                        <div>
                            <h3 className="text-lg font-medium">
                                Gemeral Information
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                General Information about your Companion
                            </p>
                        </div>
                        <Separator className="bg-primary/10" />
                    </div>
                    <FormField
                        name="src"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center justify-center space-y-4">
                                <FormControl>
                                    <ImageUpload 
                                    disabled={isLoading}
                                    onChange={field.onChange}
                                    value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    )
}