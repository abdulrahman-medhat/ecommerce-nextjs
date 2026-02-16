import React, { useRef, useState } from 'react'
import { Button } from '../../../../components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { checkOutAction } from '../../../actoins/addtocard.action'
import { Loader2 } from 'lucide-react'

export interface ShippingAddress {
    city: string
    details: string
    phone: string
}
export default function CheckOutSession({ cartId }: { cartId: string }) {

    const [isLoading, setIsLoading] = useState(false)


    const city = useRef<null | HTMLInputElement>(null)
    const details = useRef<null | HTMLInputElement>(null)
    const phone = useRef<null | HTMLInputElement>(null)


    async function checkOut() {
        setIsLoading(true)
        const shippingAddress: ShippingAddress = {
            city: city?.current?.value || "",
            details: details?.current?.value || "",
            phone: phone?.current?.value || "",
        };

        try {
            const response = await checkOutAction(cartId, shippingAddress);
            console.log(response);

            if (response.status === 'success') {
                location.href = response.session.url
            }
        } catch (error) {
            console.error(error);
            alert("Checkout failed. Please try again.");
        }
        setIsLoading(false)
    }

    return (
        <Dialog>

            <DialogTrigger asChild>

                <Button className="w-full mt-2 py-4">Check Out</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Add Shipping Address</DialogTitle>
                    <DialogDescription>
                        please, Add your Shipping Address
                    </DialogDescription>
                </DialogHeader>
                <FieldGroup>
                    <Field>
                        <Label htmlFor="city">City</Label>
                        <Input ref={city} id="city" name="city" defaultValue="Cairo" />
                    </Field>
                    <Field>
                        <Label htmlFor="details">Details</Label>
                        <Input ref={details} id="details" name="details" defaultValue="maadi" />
                    </Field>

                    <Field>
                        <Label htmlFor="phone">Phone</Label>
                        <Input ref={phone} id="phone" name="phone" defaultValue="01204512883" />
                    </Field>

                </FieldGroup>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={checkOut} type="submit" disabled={isLoading}>
                        {isLoading ? <Loader2 className="animate-spin mx-auto" /> : "Save changes"}
                    </Button>

                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}
