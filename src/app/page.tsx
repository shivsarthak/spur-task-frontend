"use client"
import type { IUser } from "@/types/IUser";
import Artwork from "@/components/artworkCard";
import UploadModal from "@/components/uploadModal";
import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { getArtworks } from "@/services/apiService";
import ArtworkCard from "@/components/artworkCard";


export default function Home() {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  console.log(session, status);

  const [artworks, setArtworks] = useState<ArtworkModel[]>([]);

  const getArtworksData = async () => {
    if(status !== "authenticated" ){
      return;
    }
    const res = await getArtworks();
    let data: ArtworkModel[] = [];

    for (let i = 0; i < res.length; i++) {
      data.push(res[i] as ArtworkModel);
    }
    setArtworks(data);
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signin");
    }
    getArtworksData();
  }, [status]);

  if (status === "loading") return <div>Loading...</div>

  if (status === "authenticated") {

    const user: IUser = (session.user! as any).user_data;


    return (
      <>
        <div
          className={`fixed z-50 inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center ${isModalOpen ? 'visible' : 'hidden'
            }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsModalOpen(false);
            }
          }}
        >
          <UploadModal onClose={() => {
            setIsModalOpen(false);
            getArtworksData()
          }} />
        </div>

        <div className="flex relative">
          <div className="flex flex-col h-screen w-52 bg-gray-100 fixed pt-8 items-center">
            <div>
              {/* user tab */}
              <h1>{user.username}</h1>
              <h3>{user.email}</h3>
            </div>
            <div className="p-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={() => setIsModalOpen(true)}
              >
                Upload Artwork
              </button>
            </div>
            <div className="px-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => { signOut(); }}
              >
                Log Out
              </button>
            </div>

          </div>
          <div className="flex-grow pl-52">
            <h1 className="text-3xl font-bold mt-2 mx-6">Artworks Gallery</h1>

            <div className=" flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 my-12 mx-6">
              {artworks.map((artwork: any, key) => (
                <ArtworkCard key={key} artwork={artwork} />))}
            </div>
          </div>

        </div>
      </>
    )
  }


}
