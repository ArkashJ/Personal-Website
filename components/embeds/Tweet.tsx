import { Tweet as ReactTweet } from 'react-tweet'

const Tweet = ({ id }: { id: string }) => (
  <div data-theme="dark" className="my-8 flex justify-center [&>div]:w-full [&>div]:max-w-[550px]">
    <ReactTweet id={id} />
  </div>
)

export default Tweet
