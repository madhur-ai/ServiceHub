import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Button from "../../components/ui/Button";

import { createBooking } from "../../api/booking/bookingApi";

export default function BookService() {

  const { id } = useParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm();

  const onSubmit = async(data)=>{

    try{

      await createBooking({

        service:id,

        bookingDate:data.bookingDate,

        bookingTime:data.bookingTime,

        address:data.address,

        notes:data.notes

      });

      toast.success("Booking Successful");

      navigate("/bookings");

    }
    catch(error){

      toast.error(
        error.response?.data?.message ||
        "Booking Failed"
      );

    }

  }

  return(

<div className="max-w-3xl mx-auto py-10 px-6">

<h1 className="text-4xl font-bold mb-8">
Book Service
</h1>

<form
onSubmit={handleSubmit(onSubmit)}
className="space-y-6"
>

<div>

<label className="font-semibold">
Booking Date
</label>

<input
type="date"

className="w-full mt-2 border rounded-xl px-4 py-3"

{...register("bookingDate",{
required:true
})}
/>

</div>

<div>

<label className="font-semibold">
Booking Time
</label>

<select

className="w-full mt-2 border rounded-xl px-4 py-3"

{...register("bookingTime",{
required:true
})}

>

<option>09:00 AM</option>
<option>10:00 AM</option>
<option>11:00 AM</option>
<option>12:00 PM</option>
<option>01:00 PM</option>
<option>02:00 PM</option>
<option>03:00 PM</option>
<option>04:00 PM</option>
<option>05:00 PM</option>

</select>

</div>

<div>

<label className="font-semibold">
Address
</label>

<textarea

rows={3}

className="w-full mt-2 border rounded-xl px-4 py-3"

{...register("address",{
required:true
})}

/>

</div>

<div>

<label className="font-semibold">
Additional Notes
</label>

<textarea

rows={4}

className="w-full mt-2 border rounded-xl px-4 py-3"

{...register("notes")}

/>

</div>

<Button
type="submit"
className="w-full"
>

Confirm Booking

</Button>

</form>

</div>

  )

}