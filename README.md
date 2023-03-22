## ChessGPT

This is a simple chess game application where you can play chess with ChatGPT, a large language model trained by OpenAI. The application is built using Next.js and deployed on Vercel.

## Getting Started

To play the game, simply visit the deployed [website](https://chessgpt.richardjzhang.com). The game should be playable directly from your browser.

To run the game locally, you'll need to have Node.js and pnpm installed on your machine, and also have an OpenAI account. Here's how to get started:

1. Clone this repository to your local machine.
2. Navigate to the cloned repository directory in your terminal.
3. Run `pnpm install` to install the required dependencies.
4. You will need to add your OpenAI API key to the variable `NEXT_PUBLIC_OPENAI_API_KEY` in the `env.local` file
5. Run `pnpm dev` to start the development server.
6. Open your browser and navigate to http://localhost:3000 to play the game.

## Acknowledgments

This application was built as a fun project to showcase the capabilities of Next.js and ChatGPT. The chess engine used in this application is [chess.js](https://github.com/jhlywa/chess.js), and the chessboard is rendered using [react-chessboard](https://github.com/Clariity/react-chessboard). Thanks to the developers of these libraries for making this project possible!

## Contributing

If you'd like to contribute to this project, feel free to submit a pull request or open an issue. We welcome all contributions and ideas!

## License

This project is licensed under the MIT license. See the LICENSE file for more information.

## Other notable projects

You should also consider checking out the following other projects that did something similar!

**ChessGPT by GDUcrash**

Website: https://chessgpt.gducrash.com/

Repositories:

- [chessgpt-server](https://github.com/GDUcrash?tab=repositories#:~:text=Sort-,chessgpt%2Dserver,-Public)
- [chessgpt-client](https://github.com/GDUcrash/chessgpt-client)
