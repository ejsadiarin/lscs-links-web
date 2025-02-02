import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useCookies } from "react-cookie";

const linkSchema = z.object({
    longLink: z.string(),
    shortLink: z.string(),
});

export const CreateLink = () => {
    //Constant URI LINK
    const URLLINK =
        import.meta.env.REACT_APP_LINKS_URL || "https://linksapidev.app.dlsu-lscs.org";

    const [currentLinksToken] = useCookies(["currentLinksToken"]);
    const token = currentLinksToken.currentLinksToken;

    const form = useForm<z.infer<typeof linkSchema>>({
        resolver: zodResolver(linkSchema),
        defaultValues: {
            longLink: "",
            shortLink: "",
        },
    });

    const onSubmit = (values: z.infer<typeof linkSchema>) => {
        console.log(values);
        const postData = async () => {
            try {
                const response = await axios.post(
                    `${URLLINK}/admin/create`,
                    { longlink: values.longLink, shortlink: values.shortLink },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log(response);
                if (response.data.status == "ok") {
                    window.location.replace("/");
                }
            } catch (e) {
                console.log(e);
            }
        };
        postData();
    };
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger>
                    <Button variant="outline" className="text-black">
                        Create New
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-transparent border-none">
                    <p className="font-bold text-3xl text-white px-8">
                        Create Short Link
                    </p>
                    <div className="space-y-8 bg-[#030711] border-2 border-[#1D283A] rounded-lg px-8 py-6 flex flex-col">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8 flex flex-col"
                            >
                                <FormField
                                    control={form.control}
                                    name="shortLink"
                                    render={({ field }) => (
                                        <>
                                            <FormItem>
                                                <FormLabel className="text-white">Short Link</FormLabel>
                                                <div className="flex space-x-1">
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            disabled
                                                            value={"lscs.info/"}
                                                            className="text-white bg-[#333437] border-2 border-[#1D283A] rounded-l-lg w-1/4"
                                                        />
                                                    </FormControl>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className="text-white bg-[#030711] border-2 border-[#1D283A] rounded-lg"
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="longLink"
                                    render={({ field }) => (
                                        <>
                                            <FormItem>
                                                <FormLabel className="text-white">Long Link</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className="text-white bg-[#030711] border-2 border-[#1D283A] rounded-lg"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                                <div className="space-x-6">
                                    <AlertDialogAction
                                        type="submit"
                                        className="text-black bg-white"
                                    >
                                        Continue
                                    </AlertDialogAction>
                                    <AlertDialogCancel className="bg-transparent border-transparent text-white">
                                        Cancel
                                    </AlertDialogCancel>
                                </div>
                            </form>
                        </Form>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
