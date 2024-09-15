/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/classnames-order */
import { Button } from '@/Components/ui/button';
import { MarkdownRenderer } from '@/Components/ui/Custom/MarkDown';
import { Form, FormControl, FormField, FormItem } from '@/Components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Mic, MoveLeft, Trash, Volume2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { NavLink } from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit'; // Import useSpeechSynthesis
import { useDebounce } from 'use-debounce';
import { z } from 'zod';

const schema = z.object({
  statement: z.string().min(1, ''),
});

function Chat() {
  const [position, setPosition] = React.useState('bottom');
  const [loading, setLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [input, setInput] = useState('');
  const [debouncedInput] = useDebounce(input, 300);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const { speak, voices } = useSpeechSynthesis();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      statement: '',
    },
  });

  const setLocalData = () => {
    localStorage.setItem('data', conversationHistory);
  };

  const saveHistory = async () => {
    console.log(conversationHistory);
    await axios
      .post(
        'http://localhost:3000/api/v1/message/addMessage',
        {
          data: conversationHistory,
        },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = form;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = async (data) => {
    if (data.statement.trim() === '') return;
    const updatedHistory = [
      ...conversationHistory,
      { role: 'user', chat: data.statement },
    ];

    setConversationHistory(updatedHistory);
    setInput('');
    form.reset({ statement: '' });
    setLoading(true);

    try {
      const response = await axios.post(
        'https://educhatbot.onrender.com/api/v1/response',
        {
          statement: data.statement,
          conversationHistory: updatedHistory,
        },
      );

      const botMessage = response.data.message;
      setConversationHistory((prevHistory) => [
        ...prevHistory,
        { role: 'bot', chat: botMessage },
      ]);

      // Optionally speak the bot's response
      // speak({ text: botMessage, voice: voices[0] });
    } catch (error) {
      console.error('Error submitting message:', error);
    } finally {
      setLoading(false);
    }

    console.log(conversationHistory);

    // Optionally save history
    // await saveHistory();
  };

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    if (recognition) {
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const lastResult = event.results[event.resultIndex];
        if (lastResult.isFinal) {
          // Final result
          const recognizedText = lastResult[0].transcript.trim();
          setInput(recognizedText);
          form.setValue('statement', recognizedText);
          handleSubmit(onSubmit)();
          setIsListening(false);
        } else {
          setInput(event.results[0][0].transcript);
        }
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        console.log('Speech recognition error', event.error);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }

    const handleBeforeUnload = (event) => {
      saveHistory();
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [recognition, handleSubmit]);

  const handleMicClick = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else if (recognition) {
      recognition.start();
      setIsListening(true);
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  };

  const handleSpeakClick = (text) => {
    // Log the text to be spoken
    console.log('Speaking:', text);

    // Ensure there are available voices and select a default if none is specified
    if (!voices || voices.length === 0) {
      console.error('No voices available for speech synthesis.');
      return;
    }

    const selectedVoice = voices[2] || voices[0];
    console.log('1');

    // Set default options
    const speakOptions = {
      text,
      voice: selectedVoice,
      rate: 1,
      pitch: 1.2,
    };

    console.log('2');

    // Break text into smaller chunks if it's too long to avoid crashing
    const maxTextLength = 200; // Maximum length for each chunk of text
    const textChunks = text.match(new RegExp(`.{1,${maxTextLength}}`, 'g'));

    console.log('3');

    if (textChunks) {
      // Recursive function to speak each chunk sequentially
      const speakChunk = (index) => {
        console.log('4');

        if (index < textChunks.length) {
          speak({
            ...speakOptions,
            text: textChunks[index],
            onend: () => speakChunk(index + 1), // Speak the next chunk after the current one finishes
            onerror: (e) => console.error('Speech synthesis error:', e),
          });
          console.log('5');
        }
      };

      // Start speaking from the first chunk
      speak(text);
    }
  };

  return (
    <div className="overflow-hidden h-screen bg-extend-primary">
      <PanelGroup direction="horizontal">
        <Panel
          className="flex overflow-y-auto flex-col gap-3 p-5 bg-extend-secondaryBase"
          defaultSize={20}
          minSize={20}
          maxSize={20}
        >
          <div className="flex justify-between items-center align-middle text-end">
            <NavLink
              to="/"
              className="flex items-center mb-2 text-sm font-bold text-blue-600 underline"
            >
              <MoveLeft className="mr-2 size-5" />
              back to home
              {/* EduChat */}
            </NavLink>
            <button
              onClick={() => {
                location.reload();
              }}
            >
              <Trash className="transition-colors duration-300 cursor-pointer size-4 text-extend-text" />
            </button>
          </div>
        </Panel>

        <PanelResizeHandle className="cursor-col-resize" />

        <Panel className="flex flex-col items-center p-8 px-24 pb-2 bg-extend-primary">
          <div className="mb-4 w-[85%] grow overflow-y-auto">
            <div
              className="flex overflow-y-auto flex-col gap-4 p-4"
              aria-live="polite"
            >
              {conversationHistory.map((message, idx) => (
                <div
                  key={idx}
                  className={`relative max-w-[70%] p-4 rounded-xl shadow-md transition-transform transform ${
                    message.role === 'user' ?
                      'self-end bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                    : 'self-start bg-gray-100 text-gray-800'
                  }`}
                  style={{ animation: 'fadeIn 0.3s ease' }} // Smooth fade-in for new messages
                >
                  <MarkdownRenderer markdown={message.chat} />

                  {/* Display button for bot messages (excluding loading state) */}
                  {message.role === 'bot' && !loading && (
                    <button
                      className="absolute right-2 bottom-2 p-2 bg-gray-300 rounded-full shadow-md transition duration-300 ease-in-out hover:bg-gray-400"
                      onClick={() => handleSpeakClick(message.chat.trim())}
                    >
                      <Volume2 className="text-gray-600" />
                    </button>
                  )}
                </div>
              ))}

              {/* Display a loading indicator with animation */}
              {loading && (
                <div className="max-w-[70%] self-start rounded-xl bg-gray-100 p-4 shadow-md flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border-4 border-t-4 border-gray-200 ease-linear loader"></div>
                  <p>Loading...</p>
                </div>
              )}

              {/* Keeps the scroll to the bottom on new messages */}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <Form
            {...form}
            className="sticky bottom-0 bg-extend-primary"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-center items-center space-x-4 w-full">
                <FormField
                  control={control}
                  name="statement"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-y-0">
                      <FormControl>
                        <textarea
                          name="input"
                          rows={1}
                          className="w-[600px] resize-none overflow-hidden rounded-md border-2 border-extend-border px-4 py-3 focus:border-gray-200 focus:outline-none"
                          style={{ height: '48px' }}
                          value={input}
                          onChange={handleInputChange}
                          onInput={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = `${Math.min(
                              e.target.scrollHeight,
                              72,
                            )}px`;
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey && !loading) {
                              e.preventDefault();
                              handleSubmit(onSubmit)();
                            } else if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                            }
                          }}
                          placeholder="Ask EduChat..."
                          {...field}
                        />
                      </FormControl>
                      {errors.statement && (
                        <p className="text-red-500">
                          {errors.statement.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isSubmitting || loading}
                  onClick={handleMicClick}
                  className={`rounded-md p-6 text-extend-primary transition-colors duration-300 ${
                    loading ? 'bg-gray-400'
                    : isListening ?
                      'bg-red-500 hover:bg-red-600' // Alert color when microphone is active
                    : 'bg-gray-600 hover:bg-gray-700'
                  } ${isSubmitting ? 'opacity-70' : ''}`}
                >
                  <Mic className="size-5" />
                </Button>

                <Button
                  disabled={isSubmitting || loading}
                  className={`rounded-md p-6 text-extend-primary transition-colors duration-300 ${
                    loading ? 'bg-gray-400' : (
                      'bg-extend-secondary hover:bg-extend-hoverSecondary'
                    )
                  } ${isSubmitting ? 'opacity-70' : ''}`}
                >
                  <i className="fa-solid fa-arrow-up-long"></i>
                </Button>
              </div>
            </form>
          </Form>
          <p className="p-0 mt-2 text-sm text-center text-gray-600">
            Educhat is in a highly development phase, so please check important
            information.
          </p>
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default Chat;
