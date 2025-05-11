import React, { useEffect, useState } from 'react';

interface User {
  name: string;
  email: string;
  avatar_url?: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetch('/api/user/')
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await fetch("/api/upload-avatar/", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      setUser((prev) => prev ? { ...prev, avatar_url: data.avatar_url } : null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center p-6">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl font-bold">Rory</h1>
          {!user && (
            <>
              <p><span className="font-semibold text-gray-400">Email:</span> rory1507@gmail.com</p>
            </>
          )}

          <input
            type="file"
            onChange={handleFileChange}
            className="text-sm mt-4 file:bg-gray-700 file:text-white file:rounded file:px-3 file:py-1"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Загрузить фото
          </button>
        </div>
        <div className="flex items-center justify-center">
          {user?.avatar_url ? (
            <img
              src={`/${user.avatar_url}`} // убедись, что сервер отдает этот путь
              alt="avatar"
              className="rounded-full w-40 h-40 object-cover border-4 border-gray-600"
            />
          ) : (
            <div className="w-40 h-40 bg-gray-600 rounded-full flex items-center justify-center text-5xl font-bold">
              {user?.name?.[0].toUpperCase() || "?"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
