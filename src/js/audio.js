/* ---------- звук "кря" ---------- */
  function quack() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const t = audioCtx.currentTime;
      const osc = (type, f0, f1, dur, gain) => {
        const o = audioCtx.createOscillator();
        o.type = type;
        o.frequency.setValueAtTime(f0, t);
        o.frequency.exponentialRampToValueAtTime(f1, t + dur);
        const g = audioCtx.createGain();
        g.gain.setValueAtTime(gain, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.04);
        o.connect(g); g.connect(audioCtx.destination);
        o.start(t); o.stop(t + dur + 0.08);
      };
      // базовой "квак": падение высоты + щепетотка
      osc('sawtooth', 340 + Math.random() * 130, 70, 0.16, 0.10);
      osc('square',   560 + Math.random() * 160, 130, 0.11, 0.05);
      const nLen = Math.max(1, 0.02 * audioCtx.sampleRate | 0);
      const buf = audioCtx.createBuffer(1, nLen, audioCtx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < nLen; i++) d[i] = (Math.random() * 2 - 1) * 0.8;
      const src = audioCtx.createBufferSource();
      src.buffer = buf;
      const ng = audioCtx.createGain();
      ng.gain.setValueAtTime(0.06, t);
      ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.025);
      src.connect(ng); ng.connect(audioCtx.destination);
      src.start(t);
    } catch (e) { /* без звука тоже ок */ }
  }
