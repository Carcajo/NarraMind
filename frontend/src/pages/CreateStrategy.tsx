export default function CreateScenario() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4 font-semibold">Create a New Scenario</h2>
      <input className="block w-full p-2 border mb-4" placeholder="Title" />
      <textarea className="block w-full p-2 border mb-4" placeholder="Description" rows={4}></textarea>
      <button className="bg-purple-500 text-white py-2 px-4 rounded">Create</button>
    </div>
  );
}