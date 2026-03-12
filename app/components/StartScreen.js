export default function StartScreen({ categories, onStart }) {
  return (
    <div className="quiz-card w-full max-w-md text-center">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Quiz App
        </h1>
        <p className="text-slate-400 text-sm">
          Pick a category and test your knowledge!
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            className="option-btn text-center font-medium"
            onClick={() => onStart(cat)}
          >
            {cat}
          </button>
        ))}

        {/* Play all categories */}
        <button
          className="option-btn text-center font-medium border-dashed"
          onClick={() => onStart(null)}
        >
          🎲 All Categories
        </button>
      </div>

      <p className="text-slate-500 text-xs">15 seconds per question</p>
    </div>
  );
}