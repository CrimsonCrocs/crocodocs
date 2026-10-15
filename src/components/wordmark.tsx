import { cn } from "@/lib/utils"
import Image from "next/image"

export function Wordmark({ className, asSpan = true, logoOnly = false, textOnly = false, size = 'default' }: { className?: string, asSpan?: boolean, logoOnly?: boolean, textOnly?: boolean, size?: 'default' | 'large' }) {

    const Component = asSpan ? 'span' : 'p';
    
    if (logoOnly) {
        const logoSize = size === 'large' ? 'h-8' : 'h-[1em]';
        return <Component className={cn('flex items-center', className)}>
            <Image src="/crocodocs.svg" alt="CrocoDocs" width={679} height={571} className={cn('w-auto', logoSize)} />
        </Component>
    }
    
    if (textOnly) {
        return <Component className={cn('croc-display text-primary', className)}>
            CrocoDocs
        </Component>
    }
    
    return <Component className={cn('inline-flex items-center gap-2 align-middle', size === 'large' && 'text-[1.75rem]', className)}>
        <Image src="/crocodocs.svg" alt="" width={679} height={571} className={cn('w-auto inline', size === 'large' ? 'h-8' : 'h-[1em]')} />
        <span className="croc-display text-foreground">
            CrocoDocs
        </span>
    </Component>

}
