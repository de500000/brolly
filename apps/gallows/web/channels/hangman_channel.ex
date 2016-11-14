defmodule Gallows.HangmanChannel do
  use Gallows.Web, :channel

  def join("hangman:game", _payload, socket) do
    {:ok, assign(socket, :game, Hangman.GameSupervisor.new_game) }
  end

  def handle_in("get_status", _, socket) do
    push socket, "status", status_payload(socket)
    {:noreply,  socket}
  end

  def handle_in("guess", %{ "letter" => letter }, socket) do
    status = Hangman.GameServer.make_move(socket.assigns.game, letter)
    payload = socket |> status_payload |> Map.put(:status, status)
    push socket, "status", payload
    { :noreply, socket }
  end

  defp status_payload(%{ assigns: %{ game: game }}) do
    %{
      used_so_far: Hangman.GameServer.letters_used_so_far(game),
      word:        Hangman.GameServer.word_as_string(game),
      turns_left:  Hangman.GameServer.turns_left(game)
    }
  end
end
