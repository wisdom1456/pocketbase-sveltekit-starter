<script lang="ts">
import { metadata } from "$lib/app/stores";
import { fade, fly } from "svelte/transition";
import Particles from "svelte-particles";
import { loadSlim } from "tsparticles-slim";

$metadata.title =
  "Transform Your Thoughts into a Flourishing Mind Garden with AI";

$metadata.description =
  "Join thousands who are already turning their thoughts into thriving mindscapes using our unique AI-powered platform.";

let particlesConfig = {
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      enable: true,
      color: "#ffffff",
    },
    move: {
      enable: true,
    },
    number: {
      value: 30,
    },
    size: {
      value: 3,
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
    },
  },
};

let onParticlesLoaded = (event: CustomEvent<{ particles?: any }>) => {
  const particlesContainer = event.detail.particles;
};

let particlesInit = async (engine: any) => {
  await loadSlim(engine);
};
</script>

<svelte:head>
  <title>{$metadata.title}</title>
  <meta name="description" content={$metadata.description} />
</svelte:head>

<!-- Hero Section -->
<div
  class="hero min-h-screen bg-base-200"
  style="background-image: url(img/treeBrain.png);"
>
  <div class="hero-overlay bg-opacity-60"></div>
  <div class="hero-content text-center text-neutral-content">
    <div class="max-w-md">
      <h1 class="mb-5 text-5xl font-bold">
        {$metadata.title}
      </h1>
      <p class="mb-5">
        Discover how mind.ai empowers you to organize and grow your ideas.
      </p>
      <button class="btn btn-primary btn-lg">Start Cultivating Now</button>
    </div>
  </div>
</div>
<!-- Features and Benefits -->
<div class="bg-base-100 py-24" id="features">
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap lg:flex-nowrap">
      <div class="w-full lg:w-1/2 lg:pr-12">
        <img
          src="img/cave.png"
          alt="Thought Capture Demo"
          class="mb-8 rounded-lg shadow-lg lg:mb-0"
        />
      </div>
      <div class="w-full lg:w-1/2" transition:fly={{ x: 20, duration: 500 }}>
        <h2 class="mb-4 text-4xl font-bold">Effortless Thought Capture</h2>
        <p class="mb-8 text-lg">
          Quickly jot down ideas and watch them grow visually in your mind
          garden.
        </p>
        <h2 class="mb-4 text-4xl font-bold">Personalized AI Assistance</h2>
        <p class="mb-8 text-lg">
          Our AI learns from your unique thought patterns to help your ideas
          flourish.
        </p>
        <h2 class="mb-4 text-4xl font-bold">Private and Secure</h2>
        <p class="text-lg">
          Your mind garden is your private oasis, secured with the latest
          encryption.
        </p>
      </div>
    </div>
  </div>
</div>
<!-- Testimonials -->
<div class="bg-base-200 py-24" id="testimonials">
  <div class="container mx-auto px-4">
    <h2 class="mb-12 text-center text-4xl font-bold">What Our Users Say</h2>
    <div class="grid gap-8 md:grid-cols-2">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <p class="mb-4">
            "mind.ai has transformed the way I organize and develop my ideas.
            It's a game-changer!"
          </p>
          <div class="card-actions justify-end">
            <p class="text-xl font-bold">John Doe</p>
            <p class="text-base-content/70">CEO, Acme Inc.</p>
          </div>
        </div>
      </div>
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <p class="mb-4">
            "The AI assistance is incredible. It's like having a personal
            thought curator."
          </p>
          <div class="card-actions justify-end">
            <p class="text-xl font-bold">Jane Smith</p>
            <p class="text-base-content/70">Creative Director, Studio X</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Pricing -->
<div class="bg-base-100 py-24" id="pricing">
  <div class="container mx-auto px-4">
    <h2 class="mb-12 text-center text-4xl font-bold">
      Simple, Transparent Pricing
    </h2>
    <div class="grid gap-8 md:grid-cols-3">
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body items-center text-center">
          <h2 class="card-title text-3xl">Basic</h2>
          <p class="text-4xl font-bold">
            $9<span class="text-base font-normal">/month</span>
          </p>
          <ul class="mb-8">
            <li>10 mind maps</li>
            <li>Basic AI assistance</li>
            <li>5 GB storage</li>
          </ul>
          <button class="btn btn-primary btn-block">Get Started</button>
        </div>
      </div>
      <div class="card bg-primary text-primary-content shadow-xl">
        <div class="card-body items-center text-center">
          <h2 class="card-title text-3xl">Pro</h2>
          <p class="text-4xl font-bold">
            $19<span class="text-base font-normal">/month</span>
          </p>
          <ul class="mb-8">
            <li>Unlimited mind maps</li>
            <li>Advanced AI assistance</li>
            <li>20 GB storage</li>
          </ul>
          <button class="btn btn-secondary btn-block">Get Started</button>
        </div>
      </div>
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body items-center text-center">
          <h2 class="card-title text-3xl">Enterprise</h2>
          <p class="text-4xl font-bold">Custom</p>
          <ul class="mb-8">
            <li>Dedicated support</li>
            <li>Custom AI models</li>
            <li>Unlimited storage</li>
          </ul>
          <button class="btn btn-primary btn-block">Contact Us</button>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Contact -->
<div class="bg-base-200 py-24" id="contact">
  <div class="container mx-auto px-4">
    <div class="mb-12 text-center" transition:fade={{ duration: 500 }}>
      <h2 class="mb-4 text-4xl font-bold">Get in Touch</h2>
      <p class="text-xl">
        Have a question or want to learn more? We'd love to hear from you!
      </p>
    </div>
    <div class="flex justify-center">
      <div class="card w-full max-w-md bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="form-control">
            <label class="label" for="name">
              <span class="label-text">Name</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label" for="email">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label" for="message">
              <span class="label-text">Message</span>
            </label>
            <textarea
              id="message"
              placeholder="Enter your message"
              class="textarea textarea-bordered"
              rows="4"
            ></textarea>
          </div>
          <div class="card-actions mt-6 justify-end">
            <button class="btn btn-primary">Send Message</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
