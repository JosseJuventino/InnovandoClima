import { LastestRegisters } from "../LastestRegisters";

export function General({ place }) {
    return (
        <section>
            <div
                className="bg-cover mt-10 bg-center h-28 flex flex-col justify-end overflow-hidden relative p-5 rounded-lg"
                style={{ backgroundImage: `url(${place.images[0]})` }}
            >
                <div className="bg-black h-full w-full absolute z-10 top-0 opacity-40 left-0">

                </div>
                <p className="text-white z-20 text-md font-semibold">Estación {place.stationNumber}</p>
                <h2 className="text-white z-20 text-3xl font-bold">{place.name}</h2>
            </div>

            <div className="mt-5">
                <LastestRegisters stationId={place._id} />
            </div>
        </section>
    );
};
