"use client";

import { Companion, Message } from "@prisma/client"
import {
    ChevronLeft,
    MessageSquare,
    MoreVertical,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { BotAvatar } from "@/components/bot-avatar";
import { 
    DropdownMenu, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";


interface ChatHeaderProps {
    companion: Companion & {
        messages: Message[];
        _count: {
            messages: number;
        };
    };
};

export const ChatHeader = ({
    companion
}: ChatHeaderProps) => {
    const router = useRouter();
    const { user } = useUser();


    return (
        <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
            <div className="flex gap-x-2 items-center">
                <Button onClick={() => router.back()} size="icon" variant="ghost">
                    <ChevronLeft className="h-8 w-8 object-cover" />
                </Button>
                <BotAvatar src={companion.src} />
                <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-x-2">
                        <p className="font-bold">
                            {companion.name}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            {companion._count.messages}
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Created by {companion.userName}
                    </p>
                </div>
            </div>
            {user?.id === companion.userId && (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button>
                            <MoreVertical/>
                        </Button>
                    </DropdownMenuTrigger>
                </DropdownMenu>
            )}
        </div>
    )
}