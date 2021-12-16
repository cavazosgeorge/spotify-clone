/* eslint-disable prettier/prettier */
import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
  RangeSlider,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";
import { useEffect, useRef, useState } from "react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlineRepeat,
  MdOutlinePauseCircleFilled,
} from "react-icons/md";
import { useStoreActions } from "easy-peasy";

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(0);
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const soundRef = useRef(null);

  // handler functions
  const setPlayState = (value) => {
    setPlaying(value);
  };

  const onShuffle = () => {
    setShuffle((state) => !state);
  };

  const onRepeat = () => {
    setRepeat((state) => !state);
  };

  const prevSong = () => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1;
    });
  };

  const nextSong = () => {
    setIndex((state) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);

        if (next === state) {
          return nextSong();
        }
        return next;
      }
      return state === songs.length - 1 ? 0 : state + 1;
    });
  };

  const onEnd = () => {
    if (repeat) {
      setSeek(0); // reset ui state
      soundRef.current.seek(0); // song state
    } else {
      nextSong();
    }
  };

  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (e) => {
    setSeek(parseFloat(e[0]));
    soundRef.current.seek(e[0]);
  };

  return (
    <Box>
      <Box>
        <ReactHowler
          playing={playing}
          src={activeSong?.url}
          ref={soundRef}
          onLoad={onLoad}
          onEnd={onEnd}
        />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            outline="none"
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            color={shuffle ? "white" : "gray.600"}
            onClick={onShuffle}
            icon={<MdShuffle />}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="skip"
            fontSize="24px"
            icon={<MdSkipPrevious />}
            onClick={prevSong}
          />
          {playing ? (
            <IconButton
              outline="none"
              variant="link"
              aria-label="pause"
              fontSize="40px"
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setPlayState(false)}
            />
          ) : (
            <IconButton
              outline="none"
              variant="link"
              aria-label="play"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => setPlayState(true)}
            />
          )}
          <IconButton
            outline="none"
            variant="link"
            aria-label="next"
            fontSize="24px"
            icon={<MdSkipNext />}
            onClick={nextSong}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="repeat"
            fontSize="24px"
            color={repeat ? "white" : "gray.600"}
            onClick={onRepeat}
            icon={<MdOutlineRepeat />}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="xs">1:21</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              aria-label={["min", "max"]} //eslint-disable-line
              step={0.1}
              id="player-range"
              min={0}
              max={duration ? duration.toFixed(2) : 0}
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%">
            <Text fontSize="xs" textAlign="right">
              3:21
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
