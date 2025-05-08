import Chat from "../components/organisms/Chat";
import HomeLayout from "../layouts/HomeLayout";

export default function Home() {
  return (
    <>
      <HomeLayout>
        <section className="px-5 lg:px-20 mt-64 lg:mt-0 flex max-lg:flex-col w-full h-full items-center  justify-center">
          <div className="text-center flex items-center justify-center flex-col">
            <h1 className="text-4xl lg:text-5xl font-semibold">
              Wizybot the Ultimate <br  className="max-lg:hidden"/> 
              Artificial Intelligence Chatbot <br className="max-lg:hidden" /> for your E-Commerce
            </h1>
            <p className="mt-2 max-lg:max-w-xs">Wizybot, the AI Chatbot for ecommerce, resolves 96% of <br  className="max-lg:hidden"/> queries, unifies chat channels and increases your sales.</p>
            <div className="flex mt-6 gap-3">
              <button className=" px-10 py-2 bg-primarye text-white bg-primary rounded-full">Install now</button>
              <button className="px-10 py-2 border border-white text-white rounded-full">Get a demo <i className="ri-arrow-right-up-line"></i></button>
            </div>
          </div>
          <aside className="lg:fixed bottom-5 max-lg:mb-32 max-lg:mt-20 right-5">
            <Chat />
          </aside>
        </section>
      </HomeLayout> 
    </>
  )
}