defmodule Hangman.GameServer do

  alias Hangman.Game, as: Impl

  use GenServer

  @name :hangman

  def start_link(word \\ Hangman.Dictionary.random_word) do
    GenServer.start_link(__MODULE__, word)
  end

  def make_move(pid, guess) do
    GenServer.call(pid, { :make_move, guess })
  end

  def word_length(pid) do
    GenServer.call(pid, { :word_length })
  end

  def letters_used_so_far(pid) do
    GenServer.call(pid, { :letters_used_so_far })
  end

  def turns_left(pid) do
    GenServer.call(pid, { :turns_left })
  end


  def word_as_string(pid, reveal \\ false) do
    GenServer.call(pid, { :word_as_string, reveal })
  end

  # used for testing

  def crash(pid, :normal) do
    if Process.whereis(pid), do: GenServer.stop(pid)
  end

  def crash(pid, reason) do
    GenServer.cast(pid, { :crash, reason })
  end
  
  ###########################
  # end of public interface #
  ###########################


  def init(word) do
    { :ok, Impl.new_game(word) }
  end

  def handle_call({ :make_move, guess }, _from, game) do
    { game, result, _guess } = Impl.make_move(game, guess)
    { :reply, result, game }
  end

  def handle_call({ :word_length }, _from, game) do
    { :reply, Impl.word_length(game), game }
  end

  def handle_call({ :letters_used_so_far }, _from, game) do
    { :reply, Impl.letters_used_so_far(game), game }
  end

  def handle_call({ :turns_left }, _from, game) do
    { :reply, Impl.turns_left(game), game }
  end

  def handle_call({ :word_as_string, reveal }, _from, game) do
    { :reply, Impl.word_as_string(game, reveal), game }
  end

  # used for testing

  def handle_cast({ :crash, reason }, game) do
    { :stop, reason, game }
  end


end
