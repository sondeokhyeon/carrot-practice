import type { NextPage } from "next";
import Layout from "../../components/layout";

const Chats: NextPage = () => {
  return (
    <Layout hasTabBar title="채팅">
      <div className="py-10 px-4 divide-y-[1px] ">
        {new Array(5).fill(1).map((_, i) => (
          <div
            className="flex cursor-pointer py-3 items-center space-x-3"
            key={i}
          >
            <div className="w-12 h-12 rounded-full bg-slate-300 " />
            <div>
              <p className="text-gray-700">Steve Jebs</p>
              <p className="text-sm font-medium text-gray-500">See you later</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
