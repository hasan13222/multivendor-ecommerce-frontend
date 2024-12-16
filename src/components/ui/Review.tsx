import { Button, Modal } from "antd";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { useAddReviewMutation } from "../../redux/features/review/reviewApi";
import { toast } from "sonner";

const Review = ({ orderItem }: any) => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const [addReview] = useAddReviewMutation(orderItem);

  async function addReviewHandler(e: any) {
    console.log(orderItem);
    e.preventDefault();
    const newReview = {
      rating,
      description: e.target.review.value,
      orderId: orderItem.id,
      productId: orderItem.productId,
    };

    const review = await addReview(newReview);
    if (review.data) {
      setReviewModalOpen(false);
      toast("review added successfully");
    } else {
      setReviewModalOpen(false);
      toast("already given review");
    }
  }
  return (
    <>
      <Button onClick={() => setReviewModalOpen(true)}>Review</Button>
      <Modal
        title="Add Review"
        open={reviewModalOpen}
        onCancel={() => setReviewModalOpen(false)}
        footer={null}
      >
        <form className="flex flex-col gap-2" onSubmit={addReviewHandler}>
          <div className="stars pt-[1px] pr-1 App">
            <Rating
              placeholderRating={0}
              emptySymbol={<FaRegStar className="text-primary" />}
              placeholderSymbol={<FaStar className="text-primary" />}
              fullSymbol={<FaStar className="text-primary" />}
              onChange={(value) => setRating(value)}
            />
          </div>
          <div>
            <input
              className="border rounded-sm px-2 py-2"
              type="text"
              name="review"
              placeholder="Write honest review"
              id=""
            />
          </div>
          <div>
            <input
              className="bg-primary px-3 py-1 rounded-md cursor-pointer"
              type="submit"
              value="Add Review"
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Review;
