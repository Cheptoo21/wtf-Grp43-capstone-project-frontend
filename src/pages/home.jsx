import WelcomeCard from "@/components/Welcome/Welcomecard";
import Header from "../components/Header/Header";
import Welcome from "@/components/Welcome/Welcome";


export default function Home(){
    

    return (
        <div className="max-w-7xl md:px-8 mx-auto px-2">
            <Header />
            <main className="flex py-5 items-center my-16 lg:my-[138px]">
                <section className="flex flex-col lg:flex-row flex-col justify-center lg:my-12 gap-y-16 ">
                    <Welcome />
                    <WelcomeCard />
                </section>
                   
            </main>
        </div>
    )
}