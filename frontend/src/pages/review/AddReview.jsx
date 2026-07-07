import { useParams } from "react-router-dom";
import ReviewForm from "../../components/review/ReviewForm";

export default function AddReview() {

  const { bookingId } = useParams();

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-8">
        Rate Your Experience
      </h1>

      <ReviewForm
        bookingId={bookingId}
        onSuccess={()=>{
          window.history.back();
        }}
      />

    </div>
  );
}